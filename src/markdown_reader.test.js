import test from 'ava';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';


import {MarkdownReader} from "./markdown_reader";


const SMOLL_HIPSTER_IMPSUM_TEXT = '' +
    '# A header \n' +
    'A body';


test('happyFlow', t => {

    const FORMAT = {
        header: 'header',
        body: 'paragraph'
    };

    const RESULT = {
        header: 'A header',
        body: 'A body'
    };

    return MarkdownReader
        .from(SMOLL_HIPSTER_IMPSUM_TEXT, FORMAT)
        .read()
        .toPromise()
        .then(result => {
            return t.deepEqual(result, RESULT);
        });
});


test('arrayResult', t => {

    const ARRAY_HIPSTER_IMPSUM_TEXT = "" +
        "# Header \n" +
        "First paragraph\n\n" +
        "Second paragraph\n\n" +
        "Third paragraph";

    const FORMAT = {
        header: 'header',
        body: {
            type: 'paragraph',
            count: 3
        }
    };

    const RESULT = {
        header: 'Header',
        body: [
            'First paragraph',
            'Second paragraph',
            'Third paragraph'
        ]
    };

    return MarkdownReader
        .from(ARRAY_HIPSTER_IMPSUM_TEXT, FORMAT)
        .read()
        .toPromise()
        .then(result => {
            return t.deepEqual(result, RESULT);
        });
});


test('objectResult', t => {

    const OBJECT_HIPSTER_IMPSUM_TEXT = "" +
        "# Mission\n" +
        "## Objectives\n" +
        "explanatory text\n\n" +
        "## Extra\n" +
        "additional text";

    const FORMAT = {
        mission: 'header',
        objective: {
            name: 'header',
            text: 'paragraph',
            extra: {
                name: 'header',
                text: 'paragraph'
            }
        }
    };

    const RESULT = {
        mission: 'Mission',
        objective: {
            name: 'Objectives',
            text: 'explanatory text',
            extra: {
                name: 'Extra',
                text: 'additional text'
            }
        }
    };

    return MarkdownReader
        .from(OBJECT_HIPSTER_IMPSUM_TEXT, FORMAT)
        .read()
        .toPromise()
        .then(result => {
            return t.deepEqual(result, RESULT);
        });
});

