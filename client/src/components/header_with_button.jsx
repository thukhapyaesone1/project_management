import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { addNewProject } from "../api/api";

export default function HeaderWithButton({ onProjectAdded }) {
    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(dayjs());


    const handleAddProject = async () => {

        let isInputValid = true;

        if (projectName == null || projectName == "") {
            isInputValid = false;

            alert("Project name must not be empty");
        } else if (description == null || description == "") {
            isInputValid = false;

            alert("Description must not be empty")
        }
        else if (deadline == null || deadline == "") {
            isInputValid = false;

            alert("Deadline must not be empty")
        }
        if (isInputValid) {
            const projectData = {
                title: projectName,
                description: description,
                deadline: deadline.format('YYYY-MM-DD'),
            };

            const success = await addNewProject(projectData);
            if (success) {
                setProjectName("");
                setDescription("");
                setDeadline(dayjs());
                setOpen(false);
                onProjectAdded();

            } else {
                alert("Failed to add project");
            }
        }
    }


    return (
        <>
            {/* Header with Add Icon */}
            <Box
                sx={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    pt: 2,
                }}
            >
                <h3 style={{ margin: 0 }}>Projects</h3>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            {/* Popup Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(1px)",
                        },
                    },
                }}
                PaperProps={{
                    sx: {
                        width: 500,            
                        p: 3,                    
                        borderRadius: 3,         
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: 20,
                        fontWeight: 700,
                        mb: 1,                 
                    }}
                >
                    Add New Project
                </DialogTitle>

                <DialogTitle
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        mt: -2,
                        mb: 2,                 
                        color: "gray",
                    }}
                >
                    Please add data to create a new project
                </DialogTitle>

                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: 400,          
                    }}
                >
                    <TextField
                        label="Project Name"
                        variant="outlined"
                        fullWidth
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#5D5D5DFF"
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5D5D5DFF"
                            }
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select date"
                            value={deadline}
                            onChange={(newValue) => setDeadline(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                                textField: {
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#5D5D5DFF', 
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#5D5D5DFF', 
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#5D5D5DFF"
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5D5D5DFF"
                            }
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ mt: 2 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleAddProject()}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
