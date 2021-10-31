import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import useCharacters from "../hooks/useCharacters";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Search from "./Search";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const addToFavorites = (favorite) => {
    dispatch({
      type: "ADD_TO_FAVORITE",
      payload: favorite,
    });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const characters = useCharacters(
    "https://rickandmortyapi.com/api/character/"
  );

  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, characters]
  );

  return (
    <div className="Characters">
      <Container>
        <Divider>
          <Chip label="Favorites" />
        </Divider>
        <Grid sx={{ flexGrow: 1 }} container rowSpacing={2} columnSpacing={1}>
          {favorites.favorites.map((character) => (
            <Grid item key={character.id}>
              <Card variant="outlined">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={character.image}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "150px",
                      display: "block",
                      overflow: "hidden",
                    }}
                  >
                    {character.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="aremove from favorite">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Search
          search={search}
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
        <Divider>
          <Chip label="Characters" />
        </Divider>
        <Grid sx={{ flexGrow: 1 }} container rowSpacing={2} columnSpacing={1}>
          {filteredCharacters.map((character) => (
            <Grid item key={character.id}>
              <Card variant="outlined">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={character.image}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: "150px",
                      display: "block",
                      overflow: "hidden",
                    }}
                  >
                    {character.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="add to favorite"
                    onClick={() => addToFavorites(character)}
                  >
                    <StarBorderOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Characters;
