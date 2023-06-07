import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const Instructions = (): JSX.Element => {
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
                <InsertDriveFileIcon sx={{ fontSize: "3.5rem" }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outline-primary">DOWNLOAD</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Instructions;
