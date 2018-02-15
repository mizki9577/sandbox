let memory = null

const imports = {
  env: {
    js_console_log: (ptr, size) => {
      const buffer = new Uint8Array(memory.buffer, ptr, size)
      const message = String.fromCodePoint(...buffer)
      console.log(message)
    },
  },
}

fetch('target/wasm32-unknown-unknown/release/rust_wasm_panic_example.wasm')
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.compile(buffer))
  .then(module => WebAssembly.instantiate(module, imports))
  .then(({ exports }) => {
    memory = exports.memory
    exports.init()
    exports.panic()
  })

// vim: set ts=2 sw=2 et:
