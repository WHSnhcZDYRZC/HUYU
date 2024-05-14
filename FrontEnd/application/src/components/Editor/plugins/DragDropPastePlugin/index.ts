/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';
import { INSERT_IMAGE_COMMAND } from '@/components/Editor/plugins/ImagesPlugin';
import { imageUpload } from '@/api/system';

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
];

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const fm = new FormData()
          files.forEach(v => fm.append("files", v));
          try {
            const { code, data: filesResult } = await imageUpload(fm);
            if (code !== 200) return;
            for (const { name, url } of filesResult) {
              // if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: name,
                src: url,
              });
              // }
            }
          } catch (error) {
            console.log(error);
          }
        })();
        // (async () => {
        //   const filesResult = await mediaFileReader(
        //     files,
        //     [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
        //   );

        //   console.log("filesResult", filesResult);

        //   for (const { file, result } of filesResult) {
        //     if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
        //       editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        //         altText: file.name,
        //         src: result,
        //       });
        //     }
        //   }
        // })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}
