import grapesjs from "grapesjs";

export const videoBackgroundPlugin = grapesjs.plugins.add(
  "video-background-plugin",
  (editor, options) => {
    const blockManager = editor.BlockManager;

    // Hero Video Background Block (No Container Wrapper)
    blockManager.add("hero-video-bg", {
      label: "Video Background Hero",
      category: "Video Backgrounds",
      content: {
        type: "video-hero",
        style: {
          position: "relative",
          width: "100%",
          height: "600px",
          overflow: "hidden",
          "border-radius": "10px", // Rounded corners for the video background
          "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.2)", // Soft shadow
        },
        components: [
          {
            type: "video",
            tagName: "video",
            attributes: {
              autoplay: true,
              loop: true,
              muted: false,
              playsinline: true,
              controls: true,
              src:
                getStoredVideoUrl() ||
                "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            style: {
              width: "100%",
              height: "100%",
              "object-fit": "cover",
              position: "absolute",
              top: "0",
              left: "0",
              "z-index": "1", // Behind the text
              "border-radius": "10px",
            },
          },
          {
            type: "text",
            content: "Welcome to Our Creative Space",
            style: {
              "font-size": "48px",
              "font-weight": "bold",
              color: "white",
              "text-shadow": "2px 2px 5px rgba(0, 0, 0, 0.7)", // Text shadow for better contrast
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Centering text
              "z-index": "2", // On top of the video
              "text-align": "center", // Centered title
              "max-width": "90%",
            },
          },
          {
            type: "text",
            content: "Innovative designs that bring your ideas to life.",
            style: {
              "font-size": "18px",
              "max-width": "800px",
              "text-align": "center",
              color: "white",
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translateX(-50%)",
              "z-index": "2", // On top of the video
              "text-shadow": "1px 1px 5px rgba(0, 0, 0, 0.5)", // Soft text shadow for readability
            },
          },
          {
            type: "link",
            content: "Get Started",
            style: {
              display: "inline-block",
              padding: "12px 30px",
              background: "linear-gradient(45deg, #FF4E50, #1FDDFF)",
              color: "#fff",
              "text-decoration": "none",
              "border-radius": "5px",
              "font-weight": "bold",
              "box-shadow": "0 4px 10px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.2s ease",
              "z-index": "2",
              marginTop: "30px",
            },
            attributes: {
              href: "#services",
            },
            //@ts-ignore
            style: {
              transform: "scale(1.05)",
            },
          },
        ],
      },
    });

    // Modify the video component to add more traits
    editor.DomComponents.addType("video-hero", {
      model: {
        defaults: {
          traits: [
            {
              type: "text",
              label: "Video URL",
              name: "video-url",
              placeholder: "Enter Video URL",
            },
            {
              type: "text",
              label: "Hero Title",
              name: "hero-title",
              placeholder: "Enter Title Here",
            },
            {
              type: "text",
              label: "Hero Description",
              name: "hero-description",
              placeholder: "Enter Description Here",
            },
            {
              type: "select",
              label: "Video Type",
              name: "video-type",
              options: [
                {
                  value: "video",
                  name: "Local Video",
                  id: "lv",
                },
                {
                  value: "youtube",
                  name: "YouTube",
                  id: "yt",
                },
                {
                  value: "vimeo",
                  name: "Vimeo",
                  id: "vm",
                },
              ],
            },
            {
              type: "color",
              label: "Title Color",
              name: "title-color",
            },
            {
              type: "color",
              label: "Description Color",
              name: "description-color",
            },
            {
              type: "button",
              text: "Upload Video",
              full: true,
              command: (editor) => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "video/*";

                input.addEventListener("change", async (event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];

                  if (file) {
                    const fileURL = URL.createObjectURL(file);
                    storeVideoUrl(fileURL); // Store in localStorage

                    const selectedComponent = editor.getSelected();
                    if (selectedComponent) {
                      const videoComponent =
                        selectedComponent.findType("video")[0];
                      if (videoComponent) {
                        videoComponent.addAttributes({
                          src: fileURL,
                          controls: true,
                        });
                        editor.trigger("change"); // Update view
                      }
                    }
                  }
                });

                input.click(); // Open file dialog
              },
            },
          ],
          init() {
            this.on("change:video-url", this.updateVideoSource);
            this.on("change:video-type", this.updateVideoSource);
            this.on("change:hero-title", this.updateHeroTitle);
            this.on("change:hero-description", this.updateHeroDescription);
            this.on("change:title-color", this.updateTitleColor);
            this.on("change:description-color", this.updateDescriptionColor);

            const videoElement = this.components().models.find(
              (comp) =>
                comp.get("tagName") === "video" ||
                comp.get("tagName") === "iframe"
            );

            if (videoElement) {
              //@ts-ignore
              videoElement.view.el.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent selecting parent container
                editor.select(videoElement); // Select the video component directly
              });
            }
          },
          methods: {
            updateVideoSource() {
              const videoType = this.get("video-type");
              const videoUrl = this.get("video-url");
              const uploadedFile = this.get("upload-video"); // Uploaded file
              console.log("uploadedFile", uploadedFile);
              const videoComponent = this.components().models.find(
                (comp) =>
                  comp.get("tagName") === "video" ||
                  comp.get("tagName") === "iframe"
              );

              if (videoComponent) {
                if (uploadedFile) {
                  // Convert uploaded file to a local URL
                  const reader = new FileReader();
                  reader.readAsDataURL(uploadedFile);

                  reader.onload = () => {
                    const fileURL = reader.result as string;

                    // Store the video in local storage
                    localStorage.setItem("uploadedVideo", fileURL);

                    console.log("Stored Video URL:", fileURL);

                    // Set the video element
                    videoComponent.set("tagName", "video");
                    videoComponent.addAttributes({
                      src: fileURL,
                      autoplay: true,
                      loop: true,
                      muted: false,
                      playsinline: true,
                      controls: true, // Enable controls for local videos
                    });

                    console.log("Uploaded Video URL:", fileURL); // Debugging purpose

                    // Force GrapesJS to re-render the canvas
                    if (this.view) {
                      this.view.render();
                    }
                  };
                } else if (videoType === "youtube" || videoType === "vimeo") {
                  const embedUrl =
                    videoType === "youtube"
                      ? `https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=1&controls=1`
                      : `https://player.vimeo.com/video/${videoUrl}?autoplay=1&muted=1&loop=1`;

                  videoComponent.set("tagName", "iframe");
                  videoComponent.addAttributes({
                    src: embedUrl,
                    frameborder: "0",
                    allowfullscreen: false,
                    allow: "autoplay; fullscreen; encrypted-media",
                  });
                } else {
                  // Retrieve video from local storage if available
                  const storedVideo = localStorage.getItem("uploadedVideo");

                  if (storedVideo) {
                    videoComponent.set("tagName", "video");
                    videoComponent.addAttributes({
                      src: storedVideo,
                      autoplay: true,
                      loop: true,
                      muted: false,
                      playsinline: true,
                      controls: true,
                    });

                    console.log(
                      "Loaded Video from Local Storage:",
                      storedVideo
                    );
                  } else {
                    videoComponent.set("tagName", "video");
                    videoComponent.addAttributes({
                      src: `/videos/${videoUrl}`,
                      autoplay: true,
                      loop: true,
                      muted: false,
                      playsinline: true,
                      controls: false,
                    });
                  }
                }

                // Force GrapesJS to re-render the canvas
                if (this.view) {
                  this.view.render();
                }
              }
            },
            updateHeroTitle() {
              const title = this.get("hero-title");
              const titleComponent = this.components().models.find(
                (comp) =>
                  comp.attributes.type === "text" &&
                  comp.attributes.style["font-size"] === "48px"
              );
              if (titleComponent) {
                titleComponent.set("content", title || "Hero Title");
              }
            },
            updateHeroDescription() {
              const description = this.get("hero-description");
              const descComponent = this.components().models.find(
                (comp) =>
                  comp.attributes.type === "text" &&
                  comp.attributes.style["font-size"] === "18px"
              );
              if (descComponent) {
                descComponent.set(
                  "content",
                  description || "Hero description goes here."
                );
              }
            },
            updateTitleColor() {
              const color = this.get("title-color");
              const titleComponent = this.components().models.find(
                (comp) =>
                  comp.attributes.type === "text" &&
                  comp.attributes.style["font-size"] === "48px"
              );
              if (titleComponent) {
                titleComponent.addStyle({ color: color || "white" });
              }
            },
            updateDescriptionColor() {
              const color = this.get("description-color");
              const descComponent = this.components().models.find(
                (comp) =>
                  comp.attributes.type === "text" &&
                  comp.attributes.style["font-size"] === "18px"
              );
              if (descComponent) {
                descComponent.addStyle({ color: color || "white" });
              }
            },
          },
        },
      },
    });
    function storeVideoUrl(url: string) {
      localStorage.setItem("uploadedVideo", url);
    }

    // Function to retrieve stored video URL
    function getStoredVideoUrl(): string | null {
      return localStorage.getItem("uploadedVideo");
    }
  }
);
