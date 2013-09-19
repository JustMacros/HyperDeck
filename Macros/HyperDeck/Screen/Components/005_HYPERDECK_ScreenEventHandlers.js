function SetVideoConnection( pvHyperDeckNo, pvVideoConnection ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'SETVIDEOCONNECTION' + '&TYPE=' + pvVideoConnection );
}

function SetAudioConnection( pvHyperDeckNo, pvAudioConnection ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'SETAUDIOCONNECTION' + '&TYPE=' + pvAudioConnection );
}

function SetFileFormat( pvHyperDeckNo, pvFileFormat ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'SETFILEFORMAT' + '&TYPE=' + pvFileFormat );
}

function SelectHyperDeckSlot( pvHyperDeckNo, pvSlotNumber ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'SELECTSLOT' + '&SLOTNO=' + pvSlotNumber );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 500 );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
}

function HyperDeck_First( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'FIRST' );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
}

function HyperDeck_Previous( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'REVERSE' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Play( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'PLAY' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Forward( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'FORWARD' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Last( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'LAST' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Eject( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'EJECT' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Pause( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'PAUSE' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Record( pvHyperDeckNo ) {
         var WkRecordingFileNameEdit = document.getElementById('eRecordingClipName_' + pvHyperDeckNo );
         var WkNextFileNameEdit      = document.getElementById('eNextClipName_' + pvHyperDeckNo );
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'RECORD' + '&FILENAME=' + WkNextFileNameEdit.value );
         WkRecordingFileNameEdit.value = WkNextFileNameEdit.value;
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeck_Stop( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'STOP' );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
         setTimeout( "PopulatePanelWithClipList(" + pvHyperDeckNo + ", 'pnlClipListCointainer_" + pvHyperDeckNo + "');", 2000 );
}

function SelectClip( pvHyperDeckNo, pvClipNumber ) {
// Note this will only work for a Single Hyperdeck situation
         if ( GLOBAL_SELECTED_CLIP != pvClipNumber ) {
            GLOBAL_SELECTED_CLIP = pvClipNumber;
            UpdateTableClipListHighlights( pvHyperDeckNo );
         }
}

function CueClip( pvHyperDeckNo, pvClipNumber ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=CUECLIP&CLIP=' + pvClipNumber );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function ToggleHyperDeckLoopMode( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'TOGGLELOOPMODE' );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function ToggleHyperDeckSingleClipMode( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'TOGGLESINGLECLIPMODE' );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeckCueSelectClip( pvHyperDeckNo ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=CUECLIP&CLIP=' + GLOBAL_SELECTED_CLIP );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
}

function HyperDeckCueVideoMode( pvHyperDeckNo, pvVideoMode ) {
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'CUEVIDEOMODE' + '&VIDEOMODE=' + pvVideoMode );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 500 );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
}

function HyperDeckCueTimeCode( pvHyperDeckNo ) {
         var WkCueEdit      = document.getElementById('eRecClockCUE' + pvHyperDeckNo );
         ResponseQryNoWait( '101_HYPERDECK_MEDIA_NAV.html?HYPERDECK=' + pvHyperDeckNo + '&COMMAND=' + 'CUETC' + '&TC=' + WkCueEdit.value );
         setTimeout( 'GetHyperdeckInfomation(' + pvHyperDeckNo + ');', 150 );
         GLOBAL_LAST_CHECKED_SCREEN = 0;
}

