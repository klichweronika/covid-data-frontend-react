import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const countryNames = ['Poland', 'Germany', 'Austria'];
type Countries = 'Poland' | 'Germany' | 'Austria';

function Home() {
    const history = useHistory();

    const formSubmitHandler = () => {
        if (!date || !countryName) {
            return;
        }

        history.push(`/raport/${countryName}/${date}`);
    }

    const [date, setDate] = useState<string>('');
    const [countryName, setCountryName] = useState<Countries>('Poland');

    return (
        <>
            <Container className="bg-white p-4 mt-4 rounded">
                <Form validated>
                    <Form.Group controlId="fa">
                        <div className="p-2">
                            <Form.Label>Select month and year</Form.Label>
                            <Form.Control
                                required
                                type="month"
                                placeholder="Select month and year"
                                value={date}
                                onChange={(value) => setDate(value.currentTarget.value)}
                            />
                        </div>

                        <div className="p-2">
                            <Form.Label>Select country</Form.Label>
                            <Form.Control
                                required
                                placeholder="-- select country --"
                                as="select"
                                custom value={countryName}
                                onChange={(value) => setCountryName(value.currentTarget.value as Countries)}>
                                {countryNames.map(countryName => <option key={countryName}>{countryName}</option>)}
                            </Form.Control>
                        </div>
                    </Form.Group>
                </Form>
                <div className="mt-5">
                    <Button
                        type="submit"
                        className="btn btn-success btn-lg btn-block"
                        onClick={formSubmitHandler}
                        variant="primary">
                        SHOW DATA
                    </Button>
                </div>

            </Container>
        </>
    );
}

export default Home;
