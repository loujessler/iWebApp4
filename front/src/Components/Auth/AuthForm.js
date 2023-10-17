import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Container,
    Row,
    Col,
    CardText,
} from 'reactstrap';
import {Link} from "react-router-dom";

function AuthForm(props) {
    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 4, offset: 4 }}>
                    <div className="card p-4 shadow-sm">
                        <CardText className="text-center mb-4 h4">{props.title}</CardText>
                        <Form onSubmit={props.handleSubmit}>
                            {props.fields.map(field => (
                                <FormGroup key={field.id}>
                                    <Label for={field.id}>{field.label}</Label>
                                    <Input
                                        type={field.type}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormGroup>
                            ))}
                            <Button
                                type="submit"
                                color={props.buttonColor}
                                block
                                className="mb-2"
                                onClick={props.handleSubmit}
                            >{props.buttonText}</Button>
                            {props.error && <p className="text-danger text-center mb-3">{props.error}</p>}

                            <Link to={props.path_to}>
                                <Button color="secondary" block>{props.footerText}</Button>
                            </Link>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthForm;
