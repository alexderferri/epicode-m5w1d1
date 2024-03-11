import React from "react";
import { Form, Button, Stack, Spinner } from "react-bootstrap";
import { useState } from "react";
import Result from "./Result";

export default function NameForm() {
  // API Endpoint
  const API = "https://api.nationalize.io?name=";

  // State Management
  const [inputName, setInputName] = useState("");
  const [apiResult, setApiResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Form Submission
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    setApiResult([]);

    //alert(`${API}${inputName}`);

    try {
      // Get the response from the API
      const response = await fetch(`${API}${inputName}`);

      // The response returned OK status
      if (response.ok) {
        // Parse response to JSON
        const result = await response.json();

        // Update state
        setApiResult(result.country);

        setLoading(false);
        //console.log(result);
      } else {
        // Throw an error
        throw new Error("Network error.");
      }
    } catch (err) {
      // Console log the error
      console.error(err);

      setLoading(false);
    }
  }

  return (
    <div>
      <Form className="mb-5 mt-5">
        <Form.Group className="mb-3">
          <Form.Label>Enter a name</Form.Label>
          <Form.Control
            value={inputName}
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setInputName(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter the name to predict its country.
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </Button>
      </Form>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {apiResult.length > 0 && (
        <Stack gap={3}>
          {apiResult.map((el) => {
            return (
              <Result country={el.country_id} probability={el.probability} />
            );
          })}
        </Stack>
      )}
    </div>
  );
}
