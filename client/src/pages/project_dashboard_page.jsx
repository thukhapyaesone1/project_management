import { Box, Divider, Typography } from "@mui/material";
import { useRef, useState } from 'react';
import { getTasks, search } from "../api/api.jsx";
import AddTask from "../components/add_task.jsx";
import HeaderWithButton from "../components/header_with_button.jsx";
import ProgressBar from "../components/progress_bar.jsx";
import ProjectList from "../components/project_list.jsx";
import SearchBox from "../components/search_box.jsx";
import TaskCard from "../components/task_card.jsx";


export default function ProjectDashboardPage() {
    const [refreshCount, setRefreshCount] = useState(0);
    const [selectedProject, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const searchRef = useRef();

    const refreshPage = () => {
        setRefreshCount(prev => prev + 1);
    };

    const fetchTasks = async (projectId) => {
        console.log("Project Id :", projectId);


        const data = await getTasks(projectId);
        setTasks(data);

        const pending = data.filter((task) => task.status === "pending");
        const inProgress = data.filter((task) => task.status === "in_progress");
        const completed = data.filter((task) => task.status === "completed");

        setPendingTasks(pending);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
    };


    const handleProjectSelect = async (value) => {
        console.log(selectedProject?.title ?? "null")
        setProject(value)
        if (value?.id != null) {
            await fetchTasks(value.id);
        }
    }

    const handleProjectDelete = () => {
        setProject(null);
        setTasks([]);
        setPendingTasks([]);
        setInProgressTasks([]);
        setCompletedTasks([]);
    }

    const searchKeyword = async (value) => {
        setIsSearch(true);
        console.log("Search Keyword :", value)
        const data = await search(value);
        console.log("Projects :", data.projects);
        setProjects(data.projects);
        setTasks(data.tasks);
        setPendingTasks(data.tasks.filter((task) => task.status === "pending"));
        setInProgressTasks(data.tasks.filter((task) => task.status === "in_progress"));
        setCompletedTasks(data.tasks.filter((task) => task.status === "completed"));
    }

    const handleClear = async () => {
        setTasks([]);
        setProjects([]);
        setPendingTasks([]);
        setInProgressTasks([]);
        setCompletedTasks([]);
        setProject(null);
        refreshPage();
        setIsSearch(false);
    }


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100%",
                backgroundColor: "#E5F2FFC3"
            }}
        >
            {/* Header */}
            <Box sx={{ color: "black", textAlign: "left", ml: 4 }}>
                <h2>Project Dashboard</h2>
            </Box>

            {/* Content */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    mb: 2,
                    mr: 2,
                }}
            >
                {/* Left box (flex 1) with ProjectList */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 3,
                        boxShadow: 1.4,
                        mx: 2,
                        p: 2,
                        overflowY: "auto",
                    }}
                >
                    <SearchBox ref={searchRef} onSearch={searchKeyword} onClear={() => handleClear()} refreshPage={refreshPage} />

                    <HeaderWithButton onProjectAdded={refreshPage} />

                    <ProjectList onEditSuccess={(project)=>{
                        console.log("Edited project in dashboard:", project);
                        setProject(project);
                    }} onDeleteSuccess={handleProjectDelete} isSearchResult={isSearch} initialProjects={projects} refreshTrigger={refreshCount} selectProject={handleProjectSelect} selectedProject={selectedProject} />
                </Box>

                {/* Right box (flex 4) */}
                <Box
                    sx={{
                        flex: 4,
                        backgroundColor: "white",
                        borderRadius: 3,
                        boxShadow: 1.4,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                textAlign: "left",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: 24,
                                p: 2,
                            }}
                        >
                            {selectedProject?.title ?? "None"} <br />

                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "left",
                                color: "black",
                                fontWeight: "normal",
                                fontSize: 16,
                                pl: 2,
                                pb: 2,
                            }}
                        >
                            Description : {selectedProject?.description ?? "N/A"}
                        </Typography>
                         <Typography
                            sx={{
                                textAlign: "left",
                                color: "black",
                                fontWeight: "normal",
                                fontSize: 16,
                                pl: 2,
                                pb: 2,
                            }}
                        >
                            Deadline : {selectedProject?.deadline ?? "N/A"}
                        </Typography>
                    </Box>
                    {/* Progress Visualization Part */}
                    <Box
                        sx={{
                            height: "10%",
                            boxShadow: 2,
                            borderRadius: 3,
                            px: 1.5,
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {/* Adding task */}
                        <Box sx={{ flex: 1, alignContent: "center", textAlign: "center", color: "black" }}>
                            {/* pass on the selected project id */}
                            <AddTask selectedProjectId={selectedProject?.id} refreshCount={() => fetchTasks(selectedProject?.id)} />
                        </Box>
                        <Box sx={{ flex: 9, alignContent: "center" }}>
                            <ProgressBar pendingCount={pendingTasks.length} inProgressCount={inProgressTasks.length} completedCount={completedTasks.length} />
                        </Box>
                    </Box>

                    <Box sx={{ height: "85%", display: "flex", flexDirection: "row" }}>
                        {/* Pending tasks */}
                        <Box sx={{ flex: 1, p: 3, justifyContent: "left", borderRight: "1px solid #C7C7C7FF" }}>
                            <Typography sx={{ textAlign: "left", color: "black", fontWeight: "bold" }}>
                                ({pendingTasks.length}) Pending tasks
                            </Typography>
                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#C7C7C7FF",
                                    borderBottomWidth: 1.5,
                                }}
                            />
                            {pendingTasks.map((task) => (
                                <TaskCard key={task.id} task={task} backgroundColor={"#FBD398FF"} refreshPage={() => {
                                    if (isSearch && searchRef.current) {
                                        searchKeyword(searchRef.current.getValue());
                                    } else {
                                        fetchTasks(task.project_id)
                                    }

                                }} />
                            ))}
                        </Box>

                        {/* In Progress tasks */}
                        <Box sx={{ flex: 1, p: 3, justifyContent: "left", borderRight: "1px solid #C7C7C7FF" }}>
                            <Typography sx={{ textAlign: "left", color: "black", fontWeight: "bold" }}>
                                ({inProgressTasks.length}) In Progress tasks
                            </Typography>
                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#C7C7C7FF",
                                    borderBottomWidth: 1.5,
                                }}
                            />
                            {inProgressTasks.map((task) => (
                                <TaskCard key={task.id} task={task} backgroundColor={"#91CBFAFF"} refreshPage={() => fetchTasks(task.project_id)} />
                            ))}
                        </Box>

                        {/* Completed tasks */}
                        <Box sx={{ flex: 1, p: 3, justifyContent: "left" }}>
                            <Typography sx={{ textAlign: "left", color: "black", fontWeight: "bold" }}>
                                ({completedTasks.length}) Completed tasks
                            </Typography>
                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#C7C7C7FF",
                                    borderBottomWidth: 1.5,
                                }}
                            />
                            {completedTasks.map((task) => (
                                <TaskCard key={task.id} task={task} backgroundColor={"#66BB6A"} refreshPage={() => fetchTasks(task.project_id)} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}
