const handleNote = (e) => {
    e.preventDefault();

    $("#errorAlert").animate({width:'hide'},350);

    if($("#noteTitle").val() == '' || $("#note").val() == '') {
        handleError("All fields are required.");
        return false;
    }

    sendAjax('POST', $("#noteForm").attr("action"), $("#noteForm").serialize(), function() {
        loadNotesFromServer();
    });

    return false;
};

const NoteForm = (props) => {
    return (
        <form id="noteForm"
            onSubmit={handleNote}
            name="noteForm"
            action="/maker"
            method="POST"
            className="noteForm"
        >
        <label htmlFor="title">Title: </label>
        <input id="noteTitle" type="text" name="title" placeholder="Title"/>
        <label htmlFor="note">Note: </label>
        <input id="note" type="text" name="note" placeholder="Note"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeNoteSubmit" type="submit" value="+" />
        </form>
    );
};

const NoteList = function(props) {
    if(props.notes.length === 0) {
        return (
            <div className="noteList">
                <h3 className="emptyNote">No notes yet.</h3>
            </div>
        );
    }

    const noteNodes = props.notes.map(function(note) {
        return (
            <div key={note._id} className="note">
                <h3 className="noteTitle"> {note.title} </h3>
                <p className="noteNote"> {note.note} </p>
            </div>
        );
    });

    return (
        <div className="noteList">
            {noteNodes}
        </div>
    );
};

const loadNotesFromServer = () => {
    sendAjax('GET', '/getNotes', null, (data) => {
        ReactDOM.render(
            <NoteList notes={data.notes} />, document.querySelector("#notes")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <NoteForm csrf={csrf} />, document.querySelector("#makeNote")
    );

    ReactDOM.render(
        <NoteList notes={[]} />, document.querySelector("#notes")
    );

    loadNotesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});