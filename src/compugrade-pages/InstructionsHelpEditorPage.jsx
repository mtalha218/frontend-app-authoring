import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@openedx/paragon";
import { useParams } from "react-router";
import { base_url } from "../compugrade-constants";

const InstructionsHelpEditorPage = ({ courseId }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [blockInfo, setBlockInfo] = useState({ key: "", title: "" });
  const { blockId, blockType } = useParams();

  useEffect(() => {
    // Conditional logic for setting blockInfo based on blockType
    if (blockType === "tools") {
      setBlockInfo({ key: "tools", title: "Tools and Terms" });
    } else if (blockType === "skills") {
      setBlockInfo({ key: "skills", title: "Skills" });
    } else if (blockType === "overview") {
      setBlockInfo({ key: "description", title: "Overview" });
    }
  }, [blockType]); // Run when blockType changes

  const handleButtonClick = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent(); // Get the editor's content
      setOutput(content); // Update state with the content
      console.log(content); // Log it to the console

      // Prepare the request body
      const requestBody = {
        openedx_based_id: blockId,
        [blockInfo.key]: content, // Set the dynamic key with the editor content as its value
      };

      try {
        const response = await fetch(base_url+ "/api/openedx/update_rubric", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Send the request body
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1050,
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h3 className="mb-4">{blockInfo.title}</h3>
      <Editor
        apiKey="your-tinymce-api-key" // Replace with your TinyMCE API key
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Start typing here...</p>"
        id="question"
        editorType="question"
        init={{
          height: 500,
          width: "100%",
          menubar: false, // Disable the menu bar
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
      />
      <div className="d-flex justify-content-end mt-4">
        <Button
          // data-testid="new-library-button"
          onClick={handleButtonClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default InstructionsHelpEditorPage;
