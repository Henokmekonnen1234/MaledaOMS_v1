#!/usr/bin/env node

export function ajax_request(url, method, token=null, contenttp=null, data=null) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      headers: {
        "Authorization": "Bearer " + token
      },
      method: method,
      data: data,
      processData: false,
      contentType: contenttp,
      success: function success(data) {
        resolve(data);
      },
      error: function error(_error) {
        reject(_error);
      }
    });
  });
}
