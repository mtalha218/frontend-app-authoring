
import warning from "../../compugrade-assets/warning.png";
import { Button } from "@openedx/paragon";
const InstructionsPreview = ({ lessonData }) => {
return (
    <div>
      <div style={{ padding: "8px", position: "relative" }}>
        {/* <h2
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#46494C",
            marginTop: "8px",
          }}
        >
          {lessonData?.description_json.title}
        </h2> */}
        <h1
          style={{ fontSize: "1.125rem", fontWeight: "700", color: "#104E7F" }}
        >
          Instructions
        </h1>
        <div
          style={{
            marginTop: "20px",
            borderRadius: "4px",
            border: "1px solid #E37066",
            backgroundColor: "#F7D5D2",
            padding: "8px 12px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <img
            src={warning}
            alt="warning"
            style={{ width: "30px", height: "30px" }}
          />
          <p
            style={{ fontWeight: "500", fontSize: "1rem", color: "#000000" }}
          >
            Please read the lesson overview first before proceeding further.
          </p>
        </div>
        <div style={{ marginTop: "12px" }}>
          {lessonData &&
            lessonData.items.map((task, index) => {
              return task.item_type === "text" ? (
                <div
                  style={{
                    marginTop: "28px",
                    marginBottom: "16px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginLeft: "12px",
                  }}
                >
                  {task.item_num} {task.natural_text}
                </div>
              ) : (
                <div key={task.id}>
                  <div
                    style={{
                      padding: "16px",
                      backgroundColor: "#F7F8FC",
                      border: "0.1px solid",
                      borderLeft: `5px solid ${
                        task.item_type === "g"
                          ? "#104E7F"
                          : task.item_type === "u"
                          ? "#B8B8B8"
                          : "#FF0000"
                      }`,
                      borderRadius: "4px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <div
                        style={{
                          minWidth: "20px",
                          height: "20px",
                          borderRadius: "2px",
                          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #ccc",
                          backgroundColor: "#fff",
                        }}
                      ></div>
                      <div>
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#000000",
                            fontWeight: "500",
                            marginTop: "-2px",
                          }}
                        >
                          {task.item_num} {task.natural_text}
                        </p>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            style={{
                              marginTop: "10px",
                              color: "#000000",
                              textAlign: "center",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              padding: "4px 12px",
                              border: "0.5px solid #104E7F",
                              borderRadius: "3px",
                            }}
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {lessonData && <div style={{marginTop:"1rem"}}>
            <Button size="sm" >Submit</Button>
          </div>}
        </div>
        {!lessonData && (
          <div
            style={{
              width: "28px",
              height: "28px",
              marginTop: "56px",
              marginInline: "auto",
            }}
            className="loader"
          />
        )}
      </div>
    </div>
  );
};

export default InstructionsPreview;
