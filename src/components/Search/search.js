import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchQuestions } from "redux/actions/searchAction";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch(searchQuestions({text:e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
        <InputGroup className="no-border">
            <Input onChange={handleChange} type="search" value={text} placeholder="Search Question Topic Tag"/>
            <InputGroupAddon addonType="append" onClick={handleSubmit} style={{ cursor: "pointer" }}>
            <InputGroupText >
                <i className="nc-icon nc-zoom-split" />
            </InputGroupText>
            </InputGroupAddon>
        </InputGroup>

    </form>
  );
};
export default Search;