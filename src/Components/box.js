export default function box(props) {
  return (
    <div
      className={props.value.freeze ? "freeze--on box" : "box"}
      onClick={props.onClick}
    >
      <h1>{props.value.value}</h1>
    </div>
  );
}
