import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
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
import { addNewTask } from '../api/api';


export default function AddTask({ selectedProjectId , refreshCount}) {
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskAssign, setTaskAssign] = useState("");
    const [taskStatus, setTaskStatus] = useState("pending");

    const handleAddTask = async () => {

        let isInputValid = true;
        if (selectedProjectId == null) {
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

        if(isInputValid){
  const taskData = {
            project_id: selectedProjectId,
            name: taskName,
            assigned_to: taskAssign,
            status: taskStatus,
        };

        const success = await addNewTask(taskData);
        if (success) {
            setTaskName("");
            setTaskAssign("");
            setTaskStatus("pending");
            refreshCount();
            setOpen(false);
        } else {
            setOpen(false);
        }
        }

      
    }

    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    };

    return (
        <Box>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    borderRadius: 5,
                    backgroundColor: "#371F50FF"
                }}
            >
                Task
            </Button>

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
                    Add New Task
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
                    <Button variant="contained" onClick={() => handleAddTask()}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}