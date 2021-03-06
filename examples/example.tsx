import { appendTo, React, RenderFn } from "../src/mod";

// list.ts
function List(render: RenderFn) {
  const element = render(<ul />);

  const addItem = (text: string) => {
    Item(appendTo(element), { text });
  };

  return { addItem };
}

// item.ts
type ItemProps = {
  text: string;
};

function Item(render: RenderFn, props: ItemProps) {
  const element = render(<li>{props.text}</li>);

  return (props: ItemProps) => (element.textContent = props.text);
}

// input.ts
function Input(render: RenderFn, addItem: (text: string) => void) {
  const input = (<input type="string" name="text" />) as HTMLInputElement;
  const element = render(
    <form>
      {input}
      <button type="submit">Add</button>
    </form>
  );

  element.addEventListener("submit", e => {
    e.preventDefault();
    addItem(input.value);
    input.value = "";
  });
}

// root.ts
function Root(render: RenderFn) {
  const element = render(<div />);

  const list = List(appendTo(element));
  Input(appendTo(element), list.addItem);

  const items = ["numero uno", "numero dos", "numero tres"];
  items.forEach(list.addItem);
}

// main.ts
const mount = document.getElementById("root");
Root(mount!.appendChild.bind(mount));
