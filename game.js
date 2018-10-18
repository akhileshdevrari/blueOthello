//Board on which game will be played, perhaps there is better way to do it
var game;

//initialize game
window.onload = function () {
	//initialize game here
	game = new Game();
}

class Board
{
	constructor()
	{
		//Set empty game board
		this.matrix = new Array(8);
		for(var i=0; i<8; i++)
			this.matrix[i] = new Array(8);
		for(var i=0; i<8; i++)
			for(var j=0; j<8; j++)
				this.matrix[i][j] = 0;

		//Place initial pieces: 1 = Black, -1 = White
		this.matrix[3][3] = this.matrix[4][4] = -1;
		this.matrix[3][4] = this.matrix[4][3] = 1;
	}
	printBoard()
	{
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				var cell = document.getElementById(i.toString()+j.toString());
				cell.innerHTML = '';
				//Place black pieces
				if(this.matrix[i][j] == 1)
					cell.innerHTML = "<img src=\"blackPiece.png\">";
				//Place white pieces
				else if(this.matrix[i][j] == -1)
					cell.innerHTML = "<img src=\"whitePiece.png\">";
			}
		}
	}
	findPossibleMoves(turn)
	{
		var possibleMoves = new Array();
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				if(this.matrix[i][j] == turn)
				{
					var move = new Move();

					//top-left direction
					move.x = i-1;
					move.y = j-1;
					while(move.x>=0 && move.y>=0 && this.matrix[move.x][move.y] == -turn)
					{
						move.x--;
						move.y--;
					}
					if(move.x>=0 && move.y>=0 && move.x<i-1 && move.y<j-1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//top direction
					move.x = i-1;
					move.y = j;
					while(move.x>=0 && this.matrix[move.x][move.y] == -turn)
					{
						move.x--;
					}
					if(move.x>=0 && move.x<i-1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//top-right direction
					move.x = i-1;
					move.y = j+1;
					while(move.x>=0 && move.y<8 && this.matrix[move.x][move.y] == -turn)
					{
						move.x--;
						move.y++;
					}
					if(move.x>=0 && move.y<8 && move.x<i-1 && move.y>j+1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//right direction
					move.x = i;
					move.y = j+1;
					while(move.y<8 && this.matrix[move.x][move.y] == -turn)
					{
						move.y++;
					}
					if(move.y<8 && move.y>j+1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//bottom-right direction
					move.x = i+1;
					move.y = j+1;
					while(move.x<8 && move.y<8 && this.matrix[move.x][move.y] == -turn)
					{
						move.x++;
						move.y++;
					}
					if(move.x<8 && move.y<8 && move.x>i+1 && move.y>j+1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//bottom direction
					move.x = i+1;
					move.y = j;
					while(move.x>=0 && this.matrix[move.x][move.y] == -turn)
					{
						move.x++;
					}
					if(move.x<8 && move.x>i+1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//bottom-left direction
					move.x = i+1;
					move.y = j-1;
					while(move.x<8 && move.y>=0 && this.matrix[move.x][move.y] == -turn)
					{
						move.x++;
						move.y--;
					}
					if(move.x<8 && move.y>=0 && move.x>i+1 && move.y<j-1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());

					//left direction
					move.x = i;
					move.y = j-1;
					while(move.y>=0 && this.matrix[move.x][move.y] == -turn)
					{
						move.y--;
					}
					if(move.y>=0 && move.y<j-1 && this.matrix[move.x][move.y]==0)
						possibleMoves.push(move.clone());
				}
			}
		}
		return possibleMoves;
	}
	highlightPossibleMoves(possibleMoves)
	{
		// document.getElementById("00").style.backgroundColor = "#26004d";
		for(var i=0; i<possibleMoves.length; i++)
		{
			var cell = document.getElementById(possibleMoves[i].x.toString()+possibleMoves[i].y.toString());
			var inputElement = document.createElement('input');
			inputElement.type = "button";
			this.setMoveOnClick(inputElement, possibleMoves[i]);
			cell.innerHTML = '';
			cell.appendChild(inputElement);
		}
	}
	//Function to set on which button click, which move to make
	setMoveOnClick(element, move)
	{
		element.addEventListener('click', function(){
		    game.makeMove(move);
		});
	}
}

class Move
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	clone()
	{
		var newMove = new Move(this.x, this.y);
		return newMove;
	}
}



class Game
{
	constructor()
	{
		this.board = new Board();
		//It's black's turn offcourse
		this.turn = 1;
		this.board.printBoard();
		var possibleMoves = this.board.findPossibleMoves(this.turn);
		this.board.highlightPossibleMoves(possibleMoves);
	}
	makeMove(move)
	{
		this.board.matrix[move.x][move.y] = this.turn;
		this.turn = -this.turn;
		//flip opponents pieces
		this.board.printBoard();
		var possibleMoves = this.board.findPossibleMoves(this.turn);
		this.board.highlightPossibleMoves(possibleMoves);
	}
}