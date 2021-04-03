import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchForm.css';

const SearchForm = ({ fetchResults }) => {
    return (
        <div id="search-bar-container">
            <Form inline>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Search for a document</Form.Label>
                    <Form.Control placeholder="Search " />
                    <Form.Control as="select" custom>
                        <option>By title</option>
                        <option>By tag</option>
                    </Form.Control>
                    <Button variant="primary" type="button" onClick>
                        Submit
                </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchForm;
