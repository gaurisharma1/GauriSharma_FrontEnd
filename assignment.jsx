// Question 1: 
// Explain what the simple List component does.

// The List component is a React component that renders an unordered list (<ul>) of items passed in as props.Each item in the list is represented by a SingleListItem component, which is a memoized component that receives props such as the text of the item, its index in the list, whether it is selected or not, and a callback function to handle clicks on the item.
// The List component maintains the selected index state using the useState hook and resets it to null whenever the items prop changes using the useEffect hook. It also memoizes the handleClick callback function using the useCallback hook to avoid unnecessary re-renders of the SingleListItem components.
// When an item is clicked, the handleClick function updates the selected index state, which in turn re-renders the SingleListItem components with the updated isSelected prop based on whether their index matches the selected index.
// Overall, the List component provides a simple and reusable way to render a list of items with the ability to select and highlight individual items.



// Question 2:
// What problems / warnings are there with code?

//There are a few things that can be improved in this component:
// The useState hook should have a default value of null.
// The handleClick function should be memoized using the useCallback hook, since it is being passed down as a prop to the SingleListItem component.
// The isSelected prop of the SingleListItem component should be a boolean indicating whether the current index is selected or not, instead of the selected index itself.
// The WrappedListComponent should have a key prop for each SingleListItem component to avoid unnecessary re-renders.
// The default value of the items prop should be an empty array instead of null.
// Here's the updated code with the above changes:



// Question 3: Please fix, optimize, and/or modify the component as much as you think is necessary.
// Code

import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={onClickHandler}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(
    (index) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex]
  );

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

List.defaultProps = {
  items: [],
};

export default List;
