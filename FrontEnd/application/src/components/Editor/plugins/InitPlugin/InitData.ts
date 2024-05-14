import HistoryStorage from "@/utils/HistoryStorage";

export const defaultData = () => {
    const layoutItem = HistoryStorage.getItem("layout");

    console.log("layoutItem", layoutItem);

    const str = layoutItem ? `font-size: ${layoutItem.fontSize}px; color: ${layoutItem.color}` : "";

    return ` {
        "editorState": {
            "root": {
                "children": [
                    {
                        "children": [
                            {
                                "detail": 0,
                                "format": 0,
                                "mode": "normal",
                                "style": "${str}",
                                "text": "新页面",
                                "type": "text",
                                "version": 1
                            }
                        ],
                        "direction": null,
                        "format": "",
                        "indent": 0,
                        "type": "heading",
                        "version": 1,
                        "tag": "h1"
                    }
                ],
                "direction": null,
                "format": "",
                "indent": 0,
                "type": "root",
                "version": 1
            }
        }
    }`
}