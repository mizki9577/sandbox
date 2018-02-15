use std::panic;
use std::ffi::CString;

extern {
    fn js_console_log(ptr: *const i8, size: usize);
}

fn console_log(message: &str) {
    if let Ok(message) = CString::new(message) {
        let size = message.as_bytes().len();
        let ptr = message.as_ptr();
        unsafe { js_console_log(ptr, size) };
    }
}

#[no_mangle]
pub fn init() {
    panic::set_hook(Box::new(|panic_info| {
        let payload = panic_info.payload();

        let payload = if payload.is::<String>() {
            Some(payload.downcast_ref::<String>().unwrap().as_str())
        } else if payload.is::<&str>() {
            Some(*payload.downcast_ref::<&str>().unwrap())
        } else {
            None
        };

        if let (Some(payload), Some(location)) = (payload, panic_info.location()) {
            console_log(format!("panicked at {:?}, {}:{}:{}", payload, location.file(), location.line(), location.column()).as_str());
        }
    }));
}

#[no_mangle]
pub fn panic() {
    panic!("Normal panic {}", 42);
}
