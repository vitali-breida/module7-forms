import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 25,
  padding: "0 30px"
});

export default function Search() {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box flexGrow={1}>
        <TextField fullWidth placeholder="What do want to watch?" />
      </Box>
      <MyButton>Search</MyButton>
    </Box>
  );
}
