// code.ts

figma.showUI(__html__, { width: 300, height: 450 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-rectangles") {
    const { values } = msg;

    // Iterate over each item in the values array
    values.forEach((item) => {
      // Create a Figma node from the SVG content
      const icon = figma.createNodeFromSvg(item.content);

      // Set the name of the created node
      icon.name = item.name;

      // Customize the appearance of the node (background, position, size, etc.)
      icon.backgrounds = [
        { type: "SOLID", opacity: 0, color: { r: 0, g: 0, b: 0 } },
      ];
      icon.x = figma.viewport.center.x;
      icon.y = figma.viewport.center.y;
      icon.resize(100, 100);

      // Append the node to the current Figma page
      figma.currentPage.appendChild(icon);

      // Select the created node and scroll/zoom it into view
      figma.currentPage.selection = [icon];
      figma.viewport.scrollAndZoomIntoView([icon]);
    });
  } else if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
