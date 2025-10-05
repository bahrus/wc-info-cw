const html = String.raw;

export const usage = html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="ts" content="${new Date().toISOString()}">
    <title>WC Info Usage</title>
    <style>
    @import "https://unpkg.com/open-props@1.3.16";
    @import "https://unpkg.com/open-props@1.3.16/normalize.min.css";
    label {
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    input{
        width: calc(100vw - 150px);
    }
</style>
<link rel="stylesheet" href="simple-ce-style.css">
</head>
<body style=margin:3px>
    <h1>WC Info Usage 2</h1>
        <form style="display:flex;flex-direction:column">
            <fieldset>
                <legend>Query Parameters</legend>
                <label for=href>
                    href
                    <input type="text" id="href" name="href" value="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace/dist/custom-elements.json">
                </label>
                
                <label for="stylesheet">
                    stylesheet
                    <input type="text" id="stylesheet" name="stylesheet" value="https://cdn.jsdelivr.net/npm/wc-info/simple-ce-style.css">
                </label>
                
                <label for="embedded">
                    embedded
                    <input type="text" id="embedded" name="embedded" value="false">
                </label>
                
                <label for="tags">
                    tags
                    <input type="text" id="tags" name="tags">
                </label>
                
                <label for="ts">
                    timestamp
                    <input type="text" id="ts" name="ts" value="${new Date().toISOString()}">
                </label>
                
            </fieldset>
            <button type="submit">Submit</button>
            

        </form>
</body>
</html>`
