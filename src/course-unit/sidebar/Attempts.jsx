import React, { useState } from "react";
import { Dropdown, Stack } from "@openedx/paragon";
import { base_url } from "../../compugrade-constants";

const Attempts = ({attempts,blockId}) => {

const [attemptValue, setAttemptValue] = useState(attempts)
  const attemptsObject = {
    label: "No. of Attempts",
    name: "attempts",
    disabled: false,
    options: [1, 2, 3, 4],
  };

  const handleAttemptChange = async (value) => {

    const apiResponse = await fetch(
      base_url+'/api/openedx/update_rubric',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no_of_attempts: value,
          openedx_based_id: blockId
        }),
      }
    );
  }
  
  return (
    <Stack className="course-unit-sidebar-header" direction="vertical">
      <h3 className="course-unit-sidebar-header-title m-0">{attemptsObject.label}</h3>
      <Dropdown className="mt-3 w-100">
        <Dropdown.Toggle
          id="type-dropdown"
          variant="outline-primary"
          className="w-100 d-flex justify-content-between align-items-center"
        >
          {attemptValue}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          {attemptsObject.options.map((value) => (
            <Dropdown.Item key={value} onClick={() => handleAttemptChange(value)}>
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default Attempts;
