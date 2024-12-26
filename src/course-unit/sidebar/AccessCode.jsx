import React, { useState } from "react";
import { Form, Stack } from "@openedx/paragon";
import classNames from 'classnames';

const AccessCode = () => {
  const [codeValue, setCodeValue] = useState("3123-321321-3213");

  return (
    <Stack className="course-unit-sidebar-header" direction="vertical">
      <h3 className="course-unit-sidebar-header-title m-0">Access Codes</h3>
      <Form className="mt-3 w-100">
        <Form.Group
          className={classNames("form-group-custom ")}
        >
          <Form.Control value={codeValue} disable={true} className="w-100"/>
        </Form.Group>
      </Form>
    </Stack>
  );
};

export default AccessCode;
