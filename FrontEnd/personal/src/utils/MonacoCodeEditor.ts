class MonacoCodeEditor {
  static readFileToContent(file?: Blob) {
    if (!file) return;
    return new Promise((res, rej) => {
      const reader = new FileReader();
      const blob = new Blob([file]);
      // 下面是文件测试
      // const _file = new File([blob], 'test.ts', {
      //   type: 'application/octet-stream',
      // });
      // console.log(await _file.text());
      reader.onload = function () {
        res(reader.result);
      };
      reader.onerror = (err) => rej(err);
      // const text = await blob.text();
      reader.readAsText(blob, 'UTF-8');
    });
  }
  static readableStreamFile(file: any) {
    if (!file) return;
    return new Promise((res, rej) => {
      // ReadableStream 解析
      const reader = file.getReader();
      const _stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
      new Response(_stream, {
        headers: { 'Content-Type': 'text/plain;charset="utf-8"' },
      })
        .text()
        .then((result) => {
          res(result);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}
export default MonacoCodeEditor;
