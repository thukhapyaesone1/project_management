import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from 'react';
import { updateProject } from "../api/api";

export default function ProjectDialog({ open, setOpen, projectId, name, descriptionValue, deadlineValue, onSaveSuccess }) {

    const [projectName, setProjectName] = useState(name);
    const [description, setDescription] = useState(descriptionValue);
    const [deadline, setDeadline] = useState(dayjs(deadlineValue, "YYYY-MM-DD"));


    useEffect(() => {
        setProjectName(name);
        setDescription(descriptionValue);
        setDeadline(dayjs(deadlineValue, "YYYY-MM-DD"));
    }, [name, descriptionValue, deadlineValue]);

    const saveEditedProject = async () => {
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
            const res = await updateProject(projectId, {
                title: projectName,
                description: description,
                deadline: deadline.format('YYYY-MM-DD'),
            });
            onSaveSuccess();
            setOpen(false);
        }

    }

    console.log("Project Dialog Rendered with:", { projectId, name, descriptionValue, deadlineValue });

    return (
        <>
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
                    Edit Project
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
                    Please make changes and hit save button
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
                    <Button variant="contained" onClick={() => saveEditedProject()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}