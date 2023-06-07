import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import ITeapot from "../models/ITeapot";

const Instructions = (): JSX.Element => {
    const [teapot] = useOutletContext<[ITeapot, () => void]>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(teapot);
    }, []);

    return (
        <Box>
            <Typography className="text-center" variant="h4">
                Instructions
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    padding: "5px",
                    width: "100%",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <InsertDriveFileIcon sx={{ fontSize: "3.5rem" }} />
                    <Typography variant="body1">User’s Manual for {teapot.name}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outline-primary" onClick={() => (window.location.href = teapot.manualUrl)}>
                        DOWNLOAD
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Instructions;
