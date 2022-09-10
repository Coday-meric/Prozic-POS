const { invoke } = window.__TAURI__.tauri;
const { getClient, Body, ResponseType } = window.__TAURI__.http;

let greetInputEl;
let successMsgEl;
let failMsgEl;
let msgEl;

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  successMsgEl = document.querySelector("#sucess-msg");
  failMsgEl = document.querySelector("#fail-msg");
  msgEl = document.querySelector("#msg");
});

async function debit() {

  successMsgEl.innerHTML = "";
  failMsgEl.innerHTML = "";
  msgEl.innerHTML = "";

  msgEl.textContent = await invoke("debit_msg", {amount: greetInputEl.value});

  const client = await getClient();
  const response = await client.request({
    method: 'POST',
    url: 'http://localhost:8000/debit',
    body: Body.json({
      amount: greetInputEl.value
    }),
    responseType: ResponseType.JSON
  });
  if (response.status === 500) {
    msgEl.innerHTML = "";
    failMsgEl.textContent = await invoke("connect_fail", {});
  } else if (response.status === 200) {
    if (response.data.state) {
      msgEl.innerHTML = "";
      successMsgEl.textContent = await invoke("debit_sucess", {amount: greetInputEl.value});
    } else {
      msgEl.innerHTML = "";
      failMsgEl.textContent = await invoke("debit_fail", {amount: greetInputEl.value});
    }
  }
}

window.debit = debit;
