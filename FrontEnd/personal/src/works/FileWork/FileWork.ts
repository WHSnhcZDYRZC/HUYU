
; (() => {
    const ctx = self;
    const MINI_FILE_SIZE = 1024 * 1000 * 10;
    ctx.onmessage = async e => {
        console.log("启动成功！", e);

        const { data: { type, SparkMD5URL, file } } = e;

        if (type === 'HASH') {
            ctx.importScripts(SparkMD5URL)
            const allSpark = new SparkMD5.ArrayBuffer();
            const result = [];

            const fileReadPromise = (arrBuffer, chunkSize, _next) => {
                // 每一片hash
                const spark = new SparkMD5.ArrayBuffer();
                const fr = new FileReader();
                fr.readAsArrayBuffer(arrBuffer);
                fr.onload = e => {
                    allSpark.append(e.target?.result);
                    spark.append(e.target?.result);

                    result.push({
                        hash: spark.end(),
                        fileStream: arrBuffer,
                        startSize: chunkSize
                    })

                    if (_next.fn) {
                        const { fn, params, next } = _next;
                        fn(params.chunk, params.chunkSize, next)
                    } else {
                        const totalFileHash = allSpark.end()

                        const resultInfo = result.map((v, i) => ({
                            info: {
                                fileName: file.name,
                                totalSize: file.size,
                                totalFileHash,
                                fileHash: v.hash,
                                totalNum: result.length,

                                // 起始位置
                                startSize: v.startSize,
                                num: i + 1,
                                // status: "READY",
                                // failNum: 0
                            },

                            fileStream: v.fileStream
                        }))

                        ctx.postMessage({
                            resultInfo,

                            // 秒传用
                            totalFileHash,
                        });

                        ctx.close();
                    }
                }
            }


            let chunkSize = 0;
            const promiseList = [];
            while (chunkSize < file.size) {
                let sliceEnd;
                if ((chunkSize + MINI_FILE_SIZE) > file.size) {
                    // 最后一片
                    sliceEnd = file.size
                } else {
                    sliceEnd = chunkSize + MINI_FILE_SIZE
                }

                let _chunk = file.slice(chunkSize, sliceEnd);

                // promiseList.push(fileReadPromise(_chunk, chunkSize))

                promiseList.push({
                    fn: fileReadPromise,
                    next: {},
                    params: { chunk: _chunk, chunkSize }
                })

                chunkSize += MINI_FILE_SIZE;
            }

            let linkHead;
            ; (() => {
                promiseList.reduce((p, r, i) => {
                    if (!i) {

                        linkHead = p;
                    }

                    p.next = r;

                    return p.next;
                }, { next: null })
            })();

            const { fn, params, next } = linkHead.next;
            fn(params.chunk, params.chunkSize, next)

            // const result = await Promise.all(promiseList)
        }
    };
})();