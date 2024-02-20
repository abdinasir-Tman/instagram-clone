import client from "./vimeo.js";

function uploadVideo(filePath) {
  console.log("Uploading: " + filePath);

  const params = {
    name: "Vimeo API SDK test upload",
    description: "This video was uploaded through the Vimeo API's NodeJS SDK.",
  };

  let metadata;
  client.upload(
    filePath,
    params,
    function (uri) {
      // Get the metadata response from the upload and log out the Vimeo.com url
      client.request(
        uri + "?fields=link",
        function (error, body, statusCode, headers) {
          if (error) {
            console.log("There was an error making the request.");
            console.log("Server reported: " + error);
            return;
          }

          console.log('"' + filePath + '" has been uploaded to ' + body.link);
          metadata = body.link;
          // Make an API call to edit the title and description of the video.
          client.request(
            {
              method: "PATCH",
              path: uri,
              params: {
                name: "Vimeo API SDK test edit",
                description:
                  "This video was edited through the Vimeo API's NodeJS SDK.",
              },
            },
            function (error, body, statusCode, headers) {
              if (error) {
                console.log("There was an error making the request.");
                console.log("Server reported: " + error);
                return;
              }

              console.log(
                "The title and description for " + uri + " has been edited."
              );

              // Make an API call to see if the video is finished transcoding.
              client.request(
                uri + "?fields=transcode.status",
                function (error, body, statusCode, headers) {
                  if (error) {
                    console.log("There was an error making the request.");
                    console.log("Server reported: " + error);
                    return;
                  }

                  console.log(
                    "The transcode status for " +
                      uri +
                      " is: " +
                      body.transcode.status
                  );
                }
              );
            }
          );
        }
      );
    },
    function (bytesUploaded, bytesTotal) {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    function (error) {
      console.log("Failed because: " + error);
    }
  );
  return metadata;
}

export default uploadVideo;
