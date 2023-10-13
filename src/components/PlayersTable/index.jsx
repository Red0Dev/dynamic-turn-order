import "./PlayersTable.module.css";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Modal,
  Box,
  Typography,
} from "@mui/material";

export default function PlayersTable() {
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [hitPoints, setHitPoints] = useState("");
  const [hpModifier, setHpModifier] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [round, setRound] = useState(0);
  const [id, setId] = useState(1);
  const [idModifier, setIdModifier] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [openHitPoints, setOpenHitPoints] = useState(false);
  const [order, setOrder] = useState("ascending");

  const sorting = (col) => {
    if (order === "ascending") {
      const sorted = [...characters].sort((a, b) => {
        return a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1;
      });
      setCharacters(sorted);
      setOrder("descending");
    }
    if (order === "descending") {
      const sorted = [...characters].sort((a, b) => {
        return a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1;
      });
      setCharacters(sorted);
      setOrder("ascending");
    }
  };

  const tableHeadContent = [
    {
      cellName: "Delete",
    },
    {
      cellName: "Character",
    },
    {
      cellName: `Initiative`,
    },
    {
      cellName: "HitPoints",
    },
  ];

  const deleteById = (id) => {
    setCharacters((oldValues) => {
      return oldValues.filter((character) => character.id !== id);
    });
  };

  const editHp = (id) => {
    const check = characters.some((character) => character.id === id);
    if (check) {
      setOpenHitPoints(true);
      setIdModifier(id);
    }
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 6,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  const buttonStyle = {
    m: 1, 
    fontSize: 16,
  }

  const buttonFormStyle = {
    m: 1, 
    fontSize: 16,
    margin: 'auto'
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader aria-label="turn order" color="secondary">
          <TableHead>
            <TableRow>
              {tableHeadContent.map(({ cellName, index }) => (
                <TableCell align="center" key={index}>
                  <Typography variant="h5">{cellName}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {characters.map((character) => {
              return (
                <TableRow
                  key={character.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ position: "relative" }}
                >
                  <TableCell style={{ top: "12px" }} align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteById(character.id)}
                    >
                      <BsTrash3 />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{character.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {character.initiative}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      onClick={() => editHp(character.id)}
                    >
                      {character.hitPoints}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableRow align="center">
            <TableCell colSpan="3" align="center">
              <Typography variant="h5">Round</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{round}</Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={ buttonStyle }
        onClick={() => setOpenAdd(true)}
      >
        Add Character
      </Button>
      <Button
        variant="contained"
        sx={ buttonStyle }
        onClick={() => setRound(round + 1)}
      >
        next round
      </Button>
      <Button
        variant="contained"
        sx={ buttonStyle }
        onClick={() => sorting("initiative")}
      >
        sort
      </Button>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box
          onSubmit={(event) => {
            event.preventDefault();
            const newCharacter = {
              id: id,
              name: name,
              initiative: Number(initiative),
              hitPoints: Number(hitPoints),
            };
            setCharacters([...characters, newCharacter]);
            setId(id + 1);
            setName("");
            setInitiative("");
            setHitPoints("");
            setOpenAdd(false);
          }}
          component="form"
          noValidate
          autoComplete="off"
          sx={boxStyle}
        >
          <TextField
            value={name}
            required
            label="Name"
            variant="outlined"
            onChange={(name) => {
              setName(name.target.value);
            }}
          />
          <TextField
            value={initiative}
            required
            label="Initiative"
            variant="outlined"
            onChange={(initiative) => {
              setInitiative(initiative.target.value);
            }}
          />
          <TextField
            value={hitPoints}
            required
            label="HitPoints"
            variant="outlined"
            onChange={(hitPoints) => {
              setHitPoints(hitPoints.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={ buttonFormStyle }
          >
            submit
          </Button>
        </Box>
      </Modal>

      <Modal open={openHitPoints} onClose={() => setOpenHitPoints(false)}>
        <Box
          onSubmit={(event) => {
            event.preventDefault();
            const updatedCharacters = characters.map((character) => {
              if (character.id === idModifier) {
                return {
                  ...character,
                  hitPoints: character.hitPoints + hpModifier,
                };
              }
              return character;
            });
            setCharacters(updatedCharacters);
            setOpenHitPoints(false);
            setHpModifier(0)
          }}
          component="form"
          noValidate
          autoComplete="off"
          sx={boxStyle}
        >
          <TextField
            focus
            required
            label="HitPoints Modifier"
            variant="outlined"
            onChange={(event) => setHpModifier(parseInt(event.target.value))}
          />
          <Button
            type="submit"
            variant="contained"
            sx={ buttonFormStyle }
          >
            submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
