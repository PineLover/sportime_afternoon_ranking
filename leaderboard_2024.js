// 토너먼트 데이터
const tournament1Data = [
    { team: '팀1', players: ['이돈휴', '김영준'], record: '4승 0패', rank: 1, score: 8 },
    { team: '팀2', players: ['강규호', '박예나'], record: '1승 3패', rank: 4, score: 5 },
    { team: '팀3', players: ['김영재', '장문주'], record: '1승 3패', rank: 5, score: 5 },
    { team: '팀4', players: ['박지민', '송경진'], record: '2승 2패', rank: 3, score: 6 },
    { team: '팀5', players: ['이광복', '문대성'], record: '2승 2패', rank: 2, score: 7 },
    { team: '팀6', players: ['장호승'], record: '부상, 심판', rank: 6, score: 5 },
];

const tournament2Data = [
    { team: '팀1', players: ['이돈휴', '박지민'], record: '2승 2패', rank: 3, score: 6 },
    { team: '팀2', players: ['장호승', '김영재'], record: '4승', rank: 1, score: 8 },
    { team: '팀3', players: ['김동환', '김희진'], record: '3승 1패', rank: 2, score: 7 },
    { team: '팀4', players: ['장문주', '강규호'], record: '4패', rank: 5, score: 5 },
    { team: '팀5', players: ['김은병', '백윤서'], record: '1승 3패', rank: 4, score: 5 }
];

const tournament3Data = [
    { team: '팀1', players: ['이돈휴', '김희진'], record: '0승 4패', rank: 5, score: 5 },
    { team: '팀2', players: ['김동환', '문대성'], record: '3승 1패', rank: 2, score: 7 },
    { team: '팀3', players: ['김영재', '박지민'], record: '2승 2패', rank: 4, score: 5 },
    { team: '팀4', players: ['장호승', '장문주'], record: '3승 1패', rank: 1, score: 8 },
    { team: '팀5', players: ['김은병', '박예나'], record: '2승 2패', rank: 3, score: 6 },
    { team: '팀6', players: ['김영재'], record: '선입금', rank: 6, score: 1 },
];

const tournament4Data = [
    { team: '팀2', players: ['장호승', '장문주', '김동환', '박지민', '김영준'], record: '6승 4패', rank: 1, score: 8 },
    { team: '팀1', players: ['김영재', '강규호', '김은병', '김희진', '이돈휴'], record: '4승 6패', rank: 2, score: 3 },
];

const tournament5Data = [
    { team: '팀1', players: ['김희진', '장호승'], record: '3승 0패', rank: 1, score: 8 },
    { team: '팀2', players: ['김동환', '박지민'], record: '2승 1패', rank: 2, score: 7 },
    { team: '팀3', players: ['이돈휴', '김영재'], record: '0승 3패', rank: 5, score: 5 },
    { team: '팀4', players: ['김은병', '박예나'], record: '2승 2패', rank: 3, score: 6 },
    { team: '팀5', players: ['장문주', '김영준'], record: '1승 2패', rank: 4, score: 5 },
];

function populateTable(tableId, data) {
    const table = document.getElementById(tableId);
    
    // 기존 테이블 내용 삭제 (헤더 제외)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // rank를 기준으로 오름차순 정렬
    const sortedData = data.sort((a, b) => a.rank - b.rank);

    sortedData.forEach(item => {
        const row = table.insertRow();
        const cell0 = row.insertCell(0);
        const cell1 = row.insertCell(1);
        const cell2 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        const cell4 = row.insertCell(4);
        
        cell0.textContent = item.team;
        cell1.textContent = item.players.join(', '); // 모든 선수를 쉼표로 구분하여 표시
        cell2.textContent = item.record;
        cell3.textContent = `${item.rank}순위`;
        cell4.textContent = `${item.score}점`;
    });
}

function calculateTotalRanking() {
    const playerScores = {};
    
    function addScores(data) {
        data.forEach(item => {
            item.players.forEach(player => {
                if (!playerScores[player]) {
                    playerScores[player] = 0;
                }
                playerScores[player] += item.score;
            });
        });
    }

    addScores(tournament1Data);
    addScores(tournament2Data);
    addScores(tournament3Data);
    addScores(tournament4Data);
    addScores(tournament5Data);

    const sortedPlayers = Object.entries(playerScores)
        .sort((a, b) => b[1] - a[1])
        .map(([name, score], index) => ({ rank: index + 1, name, score }));

    const table = document.getElementById('totalRanking');
    
    // 기존 테이블 내용 삭제 (헤더 제외)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    sortedPlayers.forEach(player => {
        const row = table.insertRow();
        row.insertCell(0).textContent = `${player.rank}순위`;
        row.insertCell(1).textContent = player.name;
        row.insertCell(2).textContent = `${player.score}점`;
        if (player.rank <= 3) {
            row.classList.add(`rank-${player.rank}`);
        }
    });
}


// 초기화 및 실행
function init() {
    calculateTotalRanking();
    populateTable('tournament1', tournament1Data);
    populateTable('tournament2', tournament2Data);
    populateTable('tournament3', tournament3Data);
    populateTable('tournament4', tournament4Data);
    populateTable('tournament5', tournament5Data);
}

// 페이지 로드 시 초기화 함수 실행
window.addEventListener('load', init);