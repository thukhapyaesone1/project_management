import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import { updateTask } from '../api/api';

export default function TaskCard({ task, backgroundColor, refreshPage }) {

    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [taskAssign, setTaskAssign] = useState(task.assigned_to);
    const [taskStatus, setTaskStatus] = useState(task.status);
    const projectId = task.project_id;

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    }

    const handleUpdateTask = async () => {

        let isInputValid = true;
        if (projectId == null) {
            isInputValid = false;
            alert("Please Choose a project");
        }
        else if (taskName == null || taskName == "") {
            isInputValid = false;

            alert("Task name must not be empty");
        } else if (taskAssign == null || taskAssign == "") {
            isInputValid = false;

            alert("Task Assign must not be empty")
        }
        else if (taskStatus == null || taskStatus == "") {
            isInputValid = false;

            alert("Status must not be empty")
        }

        if (isInputValid) {
            const taskData = {
                project_id: projectId,
                name: taskName,
                assigned_to: taskAssign,
                status: taskStatus,
            };

            const success = await updateTask(task.id, taskData);
            if (success) {
                setTaskName("");
                setTaskAssign("");
                setTaskStatus("pending");
                setOpen(false);
                await refreshPage();
            } else {
                setOpen(false);
            }
        }


    }


    return (
        <>
            <Box onClick={() => setOpen(true)} sx=
                {{
                    display: "flex",
                    flexDirection: "row",
                    color: "black",
                    textAlign: "left",
                    p: 2,
                    mb: 1.5,
                    backgroundColor: backgroundColor,
                    borderRadius: 1,
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{task.name}</Typography>
                    <Typography variant="body2">{task.assigned_to}</Typography>
                </Box>
                {/* Task Status Chip */}
                <Chip label={task.status} />
            </Box>
            {/* Popup Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
                    Edit Task
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
                        label="Task Name"
                        variant="outlined"
                        fullWidth
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
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

                    <TextField
                        label="Assigned to"
                        variant="outlined"
                        fullWidth
                        value={taskAssign}
                        onChange={(e) => setTaskAssign(e.target.value)}
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

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={taskStatus}
                            onChange={handleStatusChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Current Status' }}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                        <FormHelperText>Current Task Status</FormHelperText>
                    </FormControl>
                </DialogContent>

                <DialogActions sx={{ mt: 2 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleUpdateTask()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}