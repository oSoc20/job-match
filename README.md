# Job-Match
Job-Match is a web-app where users can explore Infrabel through interactive story-telling.
The application is built with a open-source tool named [Twine 2](https://twinery.org/) and [Twee2](https://dan-q.github.io/twee2/) which is build on top of [Twine 2](https://twinery.org/) and provides a text-based solution instead of the Graphical User Interface [Twine 2](https://twinery.org/) provides. The story format used is [Snowman](https://github.com/videlais/snowman).


## Deployment
### Requirements
First, twee2 needs to be installed. [Twee2 installation guide](https://dan-q.github.io/twee2/install.html).

Secondly the job-match repository needs to be cloned or downloaded.

### Building
Twee2 takes a .tw2 file and generates a html page as result. In the source folder run the following command:

``
twee2 build index.tw2 ../output.html --format=Snowman
``

The resulting html file can be opened and here the interactive story can be played.

## Usage
The game is composed of passages, these passages are connected with each other and can be navigated by making choices.

On each passage a event occurs, here the player has one or more choices that influence the flow of the story.


## Contributing
Job-match is built with [Twine 2](https://twinery.org/) and [Twee2](https://dan-q.github.io/twee2/), here the interactive story is comprised of passages which are connected with each other through decisions.

To make the project structured the job-match project has been divided into multiple .tw2 files and folders.

| File or Folder | Description                                                                                                                          |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------|
| index.tw2      | This is the index, all other files are mentioned here.                                                                               |
| branches       | The Job-Match story has been divided into multiple "branches". In this folder all branch files are located.                          |
| assets/css     | In the css folder all styling files are located.                                                                                     |
| script.tw2     | The code in script runs before all passages.                                                                                         |
| components.tw2 | This project makes use of [web-components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), all passage formats are put in components. These components are defined in this file.      |

### Passages
The passages are made with [haml](https://haml.info/). And with custom [web-components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) which are defined in components.tw2.
```haml
::car-ride-info [haml]
%chat-card{ :image => "./images/toolbox.png", |
    :text => "So I work for Infrabel. We’re responsible for the infrastructure the trains use."}
    [[What does that mean exactly?->infrabel-info-part-1]]
    [[Okay. So where do you want me to drop you off?->dropoff]]
```
In the example there are two "options", one of which points to infrabel-info-part-1 and the other to the dropoff passage.

Its important to mention that Job-match does not use the default Twine 2 story format (Harlow), but uses [Snowman](https://github.com/videlais/snowman). [Snowman](https://github.com/videlais/snowman) is a minimal story format designed for people who already know Javascript and CSS.

### Components
As mentioned before the Job-Match project uses [web-components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) which contain all possible passage formats.

**Components**:
* *card*: All other card components implement this class, it contains the basic styling that applies to all "Cards".
* *text-card*: This card only contains text and options.
* *image-card*: This card only contains images and options.
* *chat-card*: This card has the format of a chat bubble.
* *full-card*: This card combines the text- and image-card.
* *status-header*: This component is present in all cards, it shows how far the user is progressed in the story.

