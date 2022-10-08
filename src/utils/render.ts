


export default function renderBlock(query: string, block: any) {
  const root = document.querySelector(query)

  if (root=== null) {
    throw new Error(`root not found by selector "${query}"`);

  }

  root.innerHTML = '';
  root!.appendChild(block.getContent())
  block.dispatchComponentDidMount()
  return root
}

// function render(query: string, block: Block) {
//   const root = document.querySelector(query);
//
//   if (root === null) {
//     throw new Error(`root not found by selector "${query}"`);
//   }
//
//   root.innerHTML = '';
//
//   root.append(block.getContent()!);
//
//   return root;
// }
