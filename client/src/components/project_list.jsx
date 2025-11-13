import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from 'react';
import { deleteProject, getProjects } from '../api/api';
import ProjectDialog from './project_dialog';
export default function ProjectList({ refreshTrigger, selectProject, selectedProject, initialProjects, isSearchResult, onDeleteSuccess , onEditSuccess}) {
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        console.log("Initial Projects ", initialProjects)
        if (!isSearchResult) {
            fetchData();
        } else {
            setProjects(initialProjects);
            console.log("Project : ", initialProjects)
        }
    }, [refreshTrigger, initialProjects, isSearchResult]);

    const fetchData = async () => {
        const data = await getProjects();
        setProjects(data);
        return data;
    };

    const handleEditClick = (project) => {
        setEditingProject(project);
        console.log("Editing project:", project);
        setOpen(true);
    };

    const handleProjectDelete = async (projectId) => {
        await deleteProject(projectId);
        await fetchData();
        onDeleteSuccess();
    };

    const onSaveSuccessDialog = async () => {
        const data = await fetchData();
        setEditingProject(data.find(p => p.id === editingProject.id));
        onEditSuccess(data.find(p => p.id === editingProject.id));
    }

    return (
        <>
            <List sx={{ width: "100%", bgcolor: "white", mt: 1 }}>
                {projects.map((p, index) => {
                    const isSelected = selectedProject?.id === p.id;
                    return (
                        <Box key={p.id}>
                            <ListItem
                                onClick={() => selectProject(p)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    color: isSelected ? "white" : "black",
                                    backgroundColor: isSelected ? "#371F50FF" : "transparent",
                                    borderRadius: 2,
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                        backgroundColor: isSelected ? "#371F50FF" : "#FFFFFFC3",
                                    },
                                    cursor: "pointer",
                                }}
                            >
                                <ListItemText
                                    primary={p.title}
                                    primaryTypographyProps={{
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                    }}
                                />
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(p);
                                    }}
                                    color="primary"
                                    size="small"
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>

                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProjectDelete(p.id);
                                    }}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </ListItem>

                            {index < projects.length - 1 && <Divider />}
                        </Box>
                    );
                })}
            </List>

            {editingProject && (
                <ProjectDialog
                    open={open}
                    setOpen={setOpen}
                    projectId={editingProject.id}
                    name={editingProject.title}
                    descriptionValue={editingProject.description}
                    deadlineValue={editingProject.deadline}
                    onSaveSuccess={onSaveSuccessDialog}
                />
            )}
        </>
    );
}
