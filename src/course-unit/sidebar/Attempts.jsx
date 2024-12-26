import React, { useState } from "react";
import { Dropdown, Stack } from "@openedx/paragon";

const Attempts = () => {
  const [attemptValue, setAttemptValue] = useState(1);
  const attempts = {
    label: "No. of Attempts",
    name: "attempts",
    value: attemptValue,
    disabled: false,
    options: [1, 2, 3, 4],
  };

  return (
    <Stack className="course-unit-sidebar-header" direction="vertical">
      <h3 className="course-unit-sidebar-header-title m-0">{attempts.label}</h3>
      <Dropdown className="mt-3 w-100">
        <Dropdown.Toggle
          id="type-dropdown"
          variant="outline-primary"
          className="w-100 d-flex justify-content-between align-items-center"
        >
          {attempts.value}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          {attempts.options.map((value) => (
            <Dropdown.Item key={value} onClick={() => setAttemptValue(value)}>
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default Attempts;
