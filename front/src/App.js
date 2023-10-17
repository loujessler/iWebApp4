import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "reactstrap";

import Body from "./Components/Body";


function App() {
    return (
        <div>
            <Container className="Body">
                <Body />
            </Container>
        </div>
    );
}

export default App;
