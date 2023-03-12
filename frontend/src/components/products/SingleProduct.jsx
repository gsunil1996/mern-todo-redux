import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const SingleProduct = () => {
    const params = useParams();
    const history = useHistory();
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getData = async () => {
        setLoader(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/getProducts/${params.id}`)
            console.log("User Detail", data)
            setTimeout(() => {
                setData(data);
                setLoader(false);
            }, 500);
        } catch (error) {
            console.log("error", error.message);
            setErrorMessage(error.message);
            setLoader(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return loader ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <LinearProgress />
        </div>
    ) : errorMessage.length > 0 ? (
        <h1>{errorMessage}</h1>
    ) : (
        <div style={{ width: "100%" }} >
            <Button
                variant="contained"
                onClick={() => history.push("/products")}
                style={{ marginTop: "20px" }}
            >
                Back
            </Button>
            <h1>Name : {data?.text}</h1>
            <h2>ID: {data?._id}</h2>

        </div>
    );
}

export default SingleProduct