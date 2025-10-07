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
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    input, textarea{
        width: calc(100vw - 150px);
    }
</style>
<link rel="stylesheet" href="simple-ce-style.css">
</head>
<body style=margin:3px>
    <h1>WC Info Usage</h1>
        <form style="display:flex;flex-direction:column">
            <fieldset>
                <legend>Query Parameters</legend>
                <label>
                    href
                    <input type=text name=href value="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace/dist/custom-elements.json">
                </label>
                
                <label>
                    stylesheet
                    <input type=text name=stylesheet value="https://cdn.jsdelivr.net/npm/wc-info@0.0.182/simple-ce-style.css">
                </label>
                
                <label>
                    embedded
                    <input type=text name=embedded value="false">
                </label>
                
                <label>
                    tags
                    <input type=text name=tags>
                </label>
                
                <label>
                    timestamp
                    <input type=text name=ts value="${new Date().toISOString()}">
                </label>

                <label>
                    intro text
                    <textarea name=intro>Shoelace Web Components</textarea>
                </label> 

            </fieldset>
            <button type="submit">Submit</button>
            

        </form>
</body>
</html>`
