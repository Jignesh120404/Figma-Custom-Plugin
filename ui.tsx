// ui.tsx

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";

declare function require(path: string): any;

interface Item {
  content: string;
  name: string;
}

function App() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  React.useEffect(() => {
    // Fetch your JSON data or set it directly
    const jsonData = {
      items: [
        {
          content:
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" viewBox=\"0 0 24 24\"><path d=\"M3 18H7M10 18H21M5 21H12M16 21H19M8.8 15C6.14903 15 4 12.9466 4 10.4137C4 8.31435 5.6 6.375 8 6C8.75283 4.27403 10.5346 3 12.6127 3C15.2747 3 17.4504 4.99072 17.6 7.5C19.0127 8.09561 20 9.55741 20 11.1402C20 13.2719 18.2091 15 16 15L8.8 15Z\"/></svg>",
          name: "Cloud-fog",
        },
        {
          content:
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" viewBox=\"0 0 24 24\"><path d=\"M13 11L10 16H15L12 21M6 16.4438C4.22194 15.5683 3 13.7502 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417\"/></svg>",
          name: "Cloud-bolt",
        },
      ],
    };

    setItems(jsonData.items);
  }, []); // Fetch or set your data when the component mounts

  const onSelectItem = (item: Item) => {
    setSelectedItem(item);
  };

  const onCreate = () => {
    if (selectedItem) {
      // Send a message to the code.ts file with the selected item
      parent.postMessage(
        { pluginMessage: { type: "create-rectangles", values: [selectedItem] } },
        "*"
      );
    }
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <img src={require("./logo.svg")} alt="Logo" />
        <h2>Icon Creator</h2>
      </header>
      <section>
        <label>Select Icon:</label>
        <select onChange={(e) => onSelectItem(items.find((item) => item.name === e.target.value) || null)}>
          <option value="">-- Select an Icon --</option>
          {items.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {selectedItem && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
          </div>
        )}
      </section>
      <footer>
        <button className="brand" onClick={onCreate} disabled={!selectedItem}>
          Create Icon
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
