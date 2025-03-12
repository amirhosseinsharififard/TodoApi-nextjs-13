const RadioButton = ({children, value, title, status, setStatus}) => {
  return (
    <div className={value}>
      <labal htmlFor={value}>
        {children}
         {' ' + title}
      </labal>
      <input
        type='radio'
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
};

export default RadioButton;
