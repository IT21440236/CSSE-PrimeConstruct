import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';

export const AddSite = () => {
    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Create Site Details</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Site ID</Form.Label>
                            <Form.Control type="text" value="" onChange="" name="driverName" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control type="text" value="" onChange="" name="driverName" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Site Address</Form.Label>
                            <Form.Control type="text" value="" onChange="" name="driverName" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Site Contact Number</Form.Label>
                            <Form.Control type="text" value="" onChange="" name="driverName" />
                        </Form.Group>


                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="text" value="" onChange="" name="driverName" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Site Manager</b></Form.Label>
                            <select value="" onChange="" name="supplier" className="form-select">
                                <option>Select </option>

                            </select>
                        </Form.Group>

                    </div>

                    <button type="submit" onClick="" class="btn-style">Submit</button>
                </Form>
            </Card>
        </div>
    )
}
