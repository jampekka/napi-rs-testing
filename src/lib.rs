#![deny(clippy::all)]

use napi_derive::napi;
use napi::bindgen_prelude::*;

#[napi]
pub fn process_callback<T: Fn(Float32Array, &mut Float32Array) -> Result<()>>(callback: T) -> Float32Array {
    let input = Float32Array::new([1.0, 2.0, 3.0].to_vec());
    let mut output = Float32Array::new([0.0, 0.0, 0.0].to_vec());
    let _ = callback(input, &mut output);
    return output;
}
