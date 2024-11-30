/*/ D474designs | Modifications, and fixes by JOCV-III ///////
// All Rights Reserved //////*/

/*
TODO: Castle
TODO: Check
TODO: Check Mate
TODO: Stale Mate
TODO: Disallow move into check
TODO: en passon(sp)
TODO: visuals
*/


var S = { 
  turnInt:1, selectedPiece:0, moves:0,  
  ChangeTurn:function() {
    $(this.selectedPiece).removeClass("pcActive");    
    $([".w",".b"][this.turnInt]).removeClass("pcTurn");
    this.selectedPiece = this.moves = 0; 
    this.turnInt = 1 - this.turnInt;
    $([".w",".b"][this.turnInt]).addClass("pcTurn");       
  },  
  ClickSquare:function (square) {  
    var child = square.children().eq(0);
    if (child.hasClass(["w","b"][this.turnInt])) { this.ClickPiece(child); }
    else if (this.selectedPiece !== 0) {
      var squareID = parseInt(square.attr("id"));
      if ($.inArray(squareID, this.moves) > -1) {
        var msg = 0;
        if (child.hasClass(["b","w"][this.turnInt])) {
          if (child.hasClass("king")) {
            msg =["White","Black"][this.turnInt] + " Wins!";
          }          
          child.remove();          
        }
        if (this.selectedPiece.hasClass("pawn") && 
            (squareID > 56 || squareID < 9)) {
          this.selectedPiece.removeClass("pawn").addClass("queen");
        }
        square.append(this.selectedPiece);
        this.ChangeTurn();
        
        if (msg){
          alert(msg); window.location.href = window.location.href;
        }
      }
    }
  },  
  ClickPiece:function (piece) {    
    if (piece.hasClass(["w","b"][this.turnInt])) {
      $(this.selectedPiece).removeClass("pcActive");
      this.selectedPiece = piece;
      $(this.selectedPiece).addClass("pcActive");
      this.moves = GetPieceMoveArray(["b","w"][this.turnInt], $(piece));
    }
    else if (this.selectedPiece !== 0) { this.ClickSquare($(piece.parent())); }
  },  
  Deselect:function () {
    $(this.selectedPiece).removeClass("pcActive");
    this.selectedPiece = 0;
  }
};
S.ChangeTurn();

$(document).ready(function() {
  $(document).mousedown(function( event ) {        
    if ($(event.target).is(".pc")){  S.ClickPiece($(event.target)); }
    else if ($(event.target).is(".sq")){ S.ClickSquare($(event.target)); }
    else { S.Deselect(); }
  });
});

function GetPieceString (piece) {
  var classList = $(piece).attr('class').split(/\s+/);  
  for (var i = 0; i < classList.length; i++) {
     if (classList[i].length > 2) { return classList[i]; }
  }
}

function GetPieceMoveArray (enemyStr, piece) {
  var sqInt = parseInt($(piece).parent().attr('id'));
  var pcStr = GetPieceString($(piece));
  
  switch (pcStr) {
    case 'king': return GetMoves(enemyStr,pcStr,sqInt,[-9,-8,-7,-1,1,7,8,9],1);   
    case 'queen': return GetMoves(enemyStr,pcStr,sqInt,[-9,-8,-7,-1,1,7,8,9],7);
    case 'rook': return GetMoves(enemyStr,pcStr,sqInt,[-8,-1,1,8],7);
    case 'bishop': return GetMoves(enemyStr,pcStr,sqInt,[-9,-7,7,9],7);
    case 'knight': return GetMoves(enemyStr,pcStr,sqInt,[-17,-15,-10,-6,6,10,15,17],1);
    case 'pawn':
      var mult = (enemyStr === "b" ? 1 : -1);
      return GetMoves(enemyStr, pcStr, sqInt, [7 * mult,8 * mult, 9 * mult], 2);
    default: break;
  }
}

function GetMoves (enemyStr, pcStr, sqInt, dirArr, maxSteps) {
  var moves = [];
  for (var i = 0; i < dirArr.length; i++) {
    for(var j = 1; j <= maxSteps; j++) {
      var v = GetSquareStatus(enemyStr, pcStr, sqInt, j, dirArr[i]);
      if (v < 2) { moves.push(sqInt + j * dirArr[i]); }
      if (v > 0) { break; }
    }
  }
  return moves;
}

function GetSquareStatus (enemyStr, pcStr, startSq, step, dir) {
  var sqFrom = startSq + ((step - 1) * dir);
  var sqTo = startSq + (step * dir); 
    // rcs: 0=move&Cont 1=move&Stop 2=illegal 3=blocked 4=pawnFail
  if (startSq === sqTo || sqTo < 1 || sqTo > 64) { return 2; }
  if (Math.abs((sqFrom - 1) % 8 - (sqTo - 1) % 8) > 2) { return 2; }
  if ($('#' + sqTo).children().length > 0) {
    if (pcStr === "pawn" && (dir % 8 === 0 || step > 1)) { return 3; }
    if ($('#' + sqTo).children().eq(0).hasClass(enemyStr)) { return 1; }
    else { return 3; }
  }
  else if (pcStr === "pawn") {
    if (dir % 8 !== 0) { return 4; }
    if (step > 1) {
      if ((dir > 0 && startSq > 16) || (dir < 0 && startSq < 49)) { return 4; }
    }
  }  
  return 0;
}