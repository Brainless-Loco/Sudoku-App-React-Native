const matrix_number = (i,j) =>
{
    return (
        i<3? j<3? 1 : j<6 ? 2 : 3
    :   i<6? j<3? 4 : j<6 ? 5 : 6
    :        j<3? 7 : j<6 ? 8 : 9
    );
};

const make_array = (row, col) =>
{
	return Array.from(Array(row), () => {
                 return new Array(col).fill(0)
             });
};

const rand = () => {
    return Math.floor(Math.random()* (9)) + 1;
};

var got_pattern=false;

var SUDOKU = make_array(9,9), row = make_array(9,10),
    col = make_array(9,10), matrix = make_array(10,10);

const create_pattern = (x,y) =>
{
  let new_x = x,new_y=y+1,mat_num=matrix_number(x,y);
  if(y==8) new_x++,new_y=0;
  
  const till_now = new Set([]);
  
  while(till_now.size<9 && !got_pattern){
    let new_num = rand();
    if(till_now.has(new_num)) continue;
    till_now.add(new_num);

    if(!row[x][new_num] && !col[y][new_num] && !matrix[mat_num][new_num]){
      row[x][new_num] = 1;
      col[y][new_num] = 1;
      matrix[mat_num][new_num] = 1;

      SUDOKU [x][y]=new_num;

      if(x==8 && y==8) got_pattern=true;
      else create_pattern(new_x,new_y);
      
      row[x][new_num] = 0;
      col[y][new_num] = 0;
      matrix[mat_num][new_num] = 0;
    }
  }
};

create_pattern(0,0);

export default SUDOKU;