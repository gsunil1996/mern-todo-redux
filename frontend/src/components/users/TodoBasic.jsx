import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from "react-router-dom";


const TodoBasic = () => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [text, setText] = useState("");

  const [dataLoader, setDataLoader] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [dataError, setDataError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const [editedText, setEditedText] = useState("");
  const [editClicked, setEditClicked] = useState("");

  const [deleteClicked, setDeleteClicked] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTodo = async () => {
    setDataLoader(true);

    try {
      const { data } = await axios.get(`http://localhost:5000/`);
      if (data.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
        setData(data);
        setDataError("");
      }
      setDataLoader(false);
    } catch (error) {
      console.log(error);
      setDataError(error.message);
      setDataLoader(false);
    }
  };

  const addTodo = async () => {
    setCreateLoader(true);

    try {
      const { data } = await axios.post("http://localhost:5000/save", { text })
      setTimeout(() => {
        console.log(data)
        setText("");
        setSuccessMessage("Data Added Successfully");
        setErrorMessage("");
        setCreateLoader(false);
        getTodo();
        handleClickOpen();
      }, 500);

      setTimeout(() => {
        handleClose();
      }, 1000);

    } catch (error) {
      console.log(error)
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      setCreateLoader(false);
      handleClickOpen();
      setTimeout(() => {
        handleClose();
      }, 1000);
    }

  };

  const cancel = () => {
    setEditClicked("");
    setEditedText("");
  };

  const editTodo = async (_id) => {
    setUpdateLoader(true);

    try {
      const { data } = await axios.patch("http://localhost:5000/update", {
        _id,
        text: editedText,
      })

      setTimeout(() => {
        console.log(data);
        getTodo();
        setSuccessMessage("Data Updated Successfully");
        setErrorMessage("");
        setUpdateLoader(false);
        cancel();
        handleClickOpen();
      }, 500);

      setTimeout(() => {
        handleClose();
      }, 1000);

    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      setUpdateLoader(false);
      handleClickOpen();
      setTimeout(() => {
        handleClose();
      }, 1000);
    }

  };

  const deleteItem = (_id) => {
    setDeleteClicked(_id);
    deleteTodo(_id);
  };

  const deleteTodo = async (_id) => {
    setDeleteLoader(true);

    try {
      const { data } = await axios.delete(`http://localhost:5000/delete/${_id}`)

      setTimeout(() => {
        console.log(data);
        setSuccessMessage("Data Deleted Successfully");
        setErrorMessage("");
        setDeleteClicked("");
        setDeleteLoader(false);
        getTodo();
        handleClickOpen();
      }, 500);

      setTimeout(() => {
        handleClose();
      }, 1000);

    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      setDeleteLoader(false);
      handleClickOpen();
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div style={{ width: "100%" }} >
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ color: "#101820FF" }}>ToDo App</h1>
      </div>
      <div style={{ width: "40%", margin: "auto" }}>
        <div
          style={{ width: "80%", display: "flex", gap: "20px", margin: "auto" }}
        >
          <TextField
            id="standard-basic"
            label="Add ToDo"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%" }}
          />
          <div>
            <Button
              variant="contained"
              size="large"
              onClick={() => addTodo()}
              startIcon={createLoader ? null : <AddIcon />}
              style={{ background: "#00203FFF", color: "#ADEFD1FF" }}
              disabled={createLoader ? true : false}
            >
              {createLoader ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </div>
        {dataLoader ? (
          <div style={{ width: "100%", marginTop: "20px" }}>
            {" "}
            <LinearProgress />{" "}
          </div>
        ) : noData ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : dataError.length > 0 ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>{dataError}</h1>
          </div>
        ) : (
          <div style={{ paddingBottom: "50px" }}>
            {data.map((item) => (
              <div key={item._id}>
                <Card
                  style={{
                    marginTop: "10px",
                    background: "#101820FF",
                    color: "#FEE715FF",
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    {item._id === editClicked ? (
                      <div style={{ width: "100%" }}>
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          style={{ background: "#fff", width: "90%" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{ fontWeight: 600, cursor: "pointer" }}
                        onClick={() => history.push(`/singleTodo/${item._id}`)}
                      >
                        {item.text}
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {item._id === editClicked ? (
                        <>
                          <Button
                            variant="contained"
                            style={{
                              background: "#CE4A7EFF",
                              color: "#F2EDD7FF",
                            }}
                            onClick={() => cancel()}
                            startIcon={<CancelIcon />}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            style={{
                              background: "#2C5F2D",
                              color: "#F2EDD7FF",
                            }}
                            onClick={() => editTodo(item._id)}
                            startIcon={updateLoader ? null : <SaveIcon />}
                          >
                            {updateLoader ? (
                              <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                              "Save"
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          style={{
                            background: "#755139FF",
                            color: "#F2EDD7FF",
                          }}
                          onClick={() => {
                            setEditClicked(item._id);
                            setEditedText(item.text);
                          }}
                        >
                          Edit
                        </Button>
                      )}

                      {item._id === deleteClicked ? (
                        <Button
                          variant="contained"
                          style={{
                            background: "#990011FF",
                            color: "#FCF6F5FF",
                          }}
                          disabled
                        >
                          {deleteLoader ? (
                            <CircularProgress style={{ color: "#fff" }} />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => deleteItem(item._id)}
                          style={{
                            background: "#990011FF",
                            color: "#FCF6F5FF",
                          }}
                          startIcon={<DeleteForeverIcon />}
                          disabled={deleteLoader ? true : false}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {successMessage.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {" "}
              <CheckCircleIcon
                style={{ color: "#2C5F2D", fontSize: "100px" }}
              />{" "}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CancelIcon style={{ color: "#990011FF", fontSize: "100px" }} />{" "}
            </div>
          )}
          {successMessage.length > 0 ? (
            <h1>{successMessage}</h1>
          ) : (
            <h1>{errormessage}</h1>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoBasic;
