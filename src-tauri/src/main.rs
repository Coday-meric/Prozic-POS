#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#[tauri::command]
fn debit_msg(amount: &str) -> String {
    format!("Le paiement de {}€ a été envoyé au terminal, veuillez patienter !", amount)
}

#[tauri::command]
fn debit_sucess(amount: &str) -> String {
    format!("Le paiement de {}€ a été effectué avec succès !", amount)
}

#[tauri::command]
fn debit_fail(amount: &str) -> String {
    format!("Le paiement de {}€ a échoué !", amount)
}

#[tauri::command]
fn connect_fail() -> String {
    format!("La connection avec le terminal a échoué !")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![debit_msg, debit_sucess, debit_fail, connect_fail])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}